"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JoinTeamView from "@/components/registrations/team/JoinTeamSection";
import CreateTeamSection from "@/components/registrations/team/CreateTeamSection";
import RightSectionCreate from "@/components/registrations/team/RightSectionCreate";
import RightSectionJoin from "@/components/registrations/team/RightSectionJoin";
import { useParams } from "next/navigation";
import { useDeleteTeamMutation } from "@/apiSlice/teamApiSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2, Users, UserPlus } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/app/loading";

function Page() {
  // Add hydration-safe state initialization
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<"Create Team" | "Join Team">(
    "Create Team"
  );
  const [deletTeam, { isLoading: deleting }] = useDeleteTeamMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teamId, setTeamId] = useState<string | undefined>(undefined);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [isTeamCreated, setIsTeamCreated] = useState(false);

  const params = useParams();
  const hackathonId = params["hackathon-id"] as string;

  // Ensure client-side hydration is complete
  useEffect(() => {
    setIsClient(true);
    console.log("This should appear in browser console");
    console.log(
      "\n\n-----------------------------------------------------------------"
    );
    console.log("isLeader:", isLeader);
    console.log("isTeamCreated:", isTeamCreated);
    console.log("teamId:", teamId);
    console.log(
      "-----------------------------------------------------------------\n\n"
    );
  }, [isLeader, isTeamCreated, teamId]);

  const handleJoinTeamClick = () => {
    if (teamId && teamId !== "null") {
      setIsDeleteDialogOpen(true);
    } else {
      setActiveTab("Join Team");
    }
  };

  const handleDeleteAndJoinTeam = async () => {
    try {
      if (teamId) {
        await deletTeam(teamId).unwrap();
        toast.success("Team deleted successfully");
        setTeamId(undefined);
        setActiveTab("Join Team");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete team. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleCreateTeamClick = () => {
    setActiveTab("Create Team");
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)] min-h-screen">
      <div className="mt-16 w-full md:w-[90%] mx-auto grid grid-cols-6 gap-4">
        <div className="col-span-4">
          {isTeamCreated ? (
            isLeader ? (
              <div className="shadow-sm rounded-2xl bg-[var(--primary-2)] w-[32%]">
                <div className="flex space-x-8 px-2">
                  <motion.button
                    type="button"
                    onClick={handleCreateTeamClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-full z-50 m-2 p-3 font-bold text-sm rounded-xl flex items-center justify-center gap-2 ${
                      activeTab === "Create Team"
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    Create Team
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleJoinTeamClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-full z-50 m-2 p-3 font-bold text-sm rounded-xl flex items-center justify-center gap-2 ${
                      activeTab === "Join Team"
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <UserPlus className="h-4 w-4" />
                    Join Team
                  </motion.button>
                </div>
              </div>
            ) : (
              <div></div>
            )
          ) : (
            <div className="shadow-sm rounded-2xl bg-[var(--primary-2)] w-[32%]">
              <div className="flex space-x-8 px-2">
                <motion.button
                  type="button"
                  onClick={handleCreateTeamClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-full z-50 m-2 p-3 font-bold text-sm rounded-xl flex items-center justify-center gap-2 ${
                    activeTab === "Create Team"
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Create Team
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleJoinTeamClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-full z-50 m-2 p-3 font-bold text-sm rounded-xl flex items-center justify-center gap-2 ${
                    activeTab === "Join Team"
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  Join Team
                </motion.button>
              </div>
            </div>
          )}

          <div className="shadow-lg rounded-2xl border-t-[1px] bg-[var(--primary-1)] p-2 my-4">
            {activeTab === "Create Team" && (
              <CreateTeamSection
                hackathonId={hackathonId}
                teamId={teamId}
                setTeamId={setTeamId}
                isLeader={isLeader}
                setIsLeader={setIsLeader}
                isTeamCreated={isTeamCreated}
                setIsTeamCreated={setIsTeamCreated}
              />
            )}
            {activeTab === "Join Team" && (
              <JoinTeamView hackathonId={hackathonId} />
            )}
          </div>
        </div>

        <div className="col-span-2 shadow-lg border-t-[1px] rounded-2xl bg-[var(--primary-1)] p-2 my-4 h-screen">
          {activeTab === "Create Team" && (
            <RightSectionCreate
              isLeader={isLeader}
              isTeamCreated={isTeamCreated}
              hackathonId={hackathonId}
              teamId={teamId}
            />
          )}
          {activeTab === "Join Team" && (
            <RightSectionJoin hackathonId={hackathonId} />
          )}
        </div>
      </div>

      {/* Delete Team Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="sm:max-w-[500px] bg-[var(--primary-1)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              Switch to Join Team?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base leading-relaxed">
              <div className="space-y-3">
                <div>
                  You currently have a team created for this hackathon. To join
                  another team, your current team will be{" "}
                  <span className="font-semibold text-red-600">
                    permanently deleted
                  </span>
                  .
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="text-orange-800 text-sm font-medium">
                    ⚠️ This action cannot be undone. All team data including:
                  </div>
                  <ul className="text-orange-700 text-sm mt-2 ml-4 space-y-1">
                    <li>• Team name and description</li>
                    <li>• Required skills list</li>
                    <li>• Team member information</li>
                    <li>• Project details</li>
                  </ul>
                  <div className="text-orange-700 text-sm mt-2">
                    will be permanently removed.
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Are you sure you want to delete your current team and proceed
                  to join another team?
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel onClick={handleCancelDelete} className="px-6">
              Keep My Team
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAndJoinTeam}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600 px-6"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting Team...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Delete Team & Join Others
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Page;
