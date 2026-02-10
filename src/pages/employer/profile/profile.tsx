"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Loader2,
  Building2,
  Mail,
  Phone,
  Globe,
  Bell,
  Trash2,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; 
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

interface CompanyProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  about: string;
  website: string;
  industry_code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  full_address: string;
  size_range: string;
  status: string;
  is_verified: boolean;
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  owner: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface NotificationSettings {
  emailNotifications: boolean;
  jobAlerts: boolean;
  applicationUpdates: boolean;
  newsletter: boolean;
}

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      jobAlerts: true,
      applicationUpdates: true,
      newsletter: false,
    });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchNotificationSettings();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const fullUrl = `${apiUrl}/employers/company`;

      console.log("🔍 Fetching from URL:", fullUrl);

      if (!token) {
        console.error("❌ No token found!");
        navigate("/sign-in");
        return;
      }

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const text = await response.text();

      if (text.startsWith("<!")) {
        console.error("❌ Received HTML instead of JSON!");
        setError(
          "Server error: Received HTML instead of JSON. Check backend logs.",
        );
        return;
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/sign-in");
          return;
        }
        if (response.status === 404) {
          setError("No company profile found. Please create one first.");
          return;
        }
        throw new Error(`API Error: ${response.status}`);
      }

      setProfile(data.data);
      console.log("✅ Profile set successfully:", data.data);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load profile",
      );
    } finally {
      setIsLoading(false);
    }
  };
  
//////////  NOTOFICATION SETTINGS //////////
  const fetchNotificationSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(
        `${apiUrl}/employers/notification-settings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(data.data);
      }
    } catch (error) {
      console.error("Error fetching notification settings:", error);
    }
  };

  const handleNotificationToggle = async (key: keyof NotificationSettings) => {
    const newSettings = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    };

    setNotificationSettings(newSettings);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      await fetch(`${apiUrl}/employers/notification-settings`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      });

      toast.success("Notification settings updated");
    } catch (error) {
      console.error("Error updating notification settings:", error);
      toast.error("Failed to update settings");
      // Revert on error
      setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== profile?.name) {
      toast.error(`Please type "${profile?.name}" to confirm deletion`);
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${apiUrl}/employers/account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500 mb-4">{error}</p>
            <Button
              className="w-full"
              onClick={() => navigate("/employer/onboarding")}>
              Create Company Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No profile data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Actions Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your company profile and settings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="gap-2"
            onClick={() => navigate("/employer/profile/edit")}>
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/employer/notifications")}>
                View All Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/employer/settings")}>
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Company Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    {profile.is_verified && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700">
                        Verified
                      </Badge>
                    )}
                    <Badge variant="outline">{profile.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {profile.industry_code || "Industry not specified"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.size_range || "Company size not specified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">
                      {profile.email || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    {profile.website ? (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline">
                        {profile.website}
                      </a>
                    ) : (
                      <p className="font-medium">Not provided</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">
                    {profile.full_address || "Not provided"}
                  </p>
                </div>
              </div>

              {profile.about && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">About</p>
                  <p className="text-sm">{profile.about}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {profile.owner.first_name} {profile.owner.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.owner.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() =>
                    handleNotificationToggle("emailNotifications")
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="job-alerts">Job Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    New job applications
                  </p>
                </div>
                <Switch
                  id="job-alerts"
                  checked={notificationSettings.jobAlerts}
                  onCheckedChange={() => handleNotificationToggle("jobAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="application-updates">
                    Application Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Status changes
                  </p>
                </div>
                <Switch
                  id="application-updates"
                  checked={notificationSettings.applicationUpdates}
                  onCheckedChange={() =>
                    handleNotificationToggle("applicationUpdates")
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Monthly updates
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  checked={notificationSettings.newsletter}
                  onCheckedChange={() => handleNotificationToggle("newsletter")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {Object.keys(profile.social_links || {}).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {profile.social_links.linkedin && (
                    <a
                      href={profile.social_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                      aria-label="LinkedIn">
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                  )}
                  {profile.social_links.twitter && (
                    <a
                      href={profile.social_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                      aria-label="Twitter">
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  )}
                  {profile.social_links.facebook && (
                    <a
                      href={profile.social_links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Facebook">
                      <FaFacebook className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Delete your account and all associated data. This action
                  cannot be undone.
                </p>

                <Dialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This will permanently delete your account and all
                        associated data. Please type "{profile.name}" to
                        confirm.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm-delete">
                          Type "{profile.name}" to confirm
                        </Label>
                        <Input
                          id="confirm-delete"
                          value={deleteConfirmation}
                          onChange={(e) =>
                            setDeleteConfirmation(e.target.value)
                          }
                          placeholder={profile.name}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={
                          isDeleting || deleteConfirmation !== profile.name
                        }>
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete Account Permanently"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}