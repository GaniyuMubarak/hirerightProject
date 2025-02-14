import BasicInfoForm from "@/components/candidate/onboarding/basic-info-form";
import CertificationForm from "@/components/candidate/onboarding/certification-form";
import EducationForm from "@/components/candidate/onboarding/education-form";
import ExperienceForm from "@/components/candidate/onboarding/experience-form";
import SocialLinksForm from "@/components/candidate/onboarding/social-links-form";
import ChangePassword from "@/components/candidate/settings/change-password";
import DeleteAccount from "@/components/candidate/settings/delete-account";
import { ProfileSettings } from "@/components/candidate/settings/settings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditProfile() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 space-y-8 ">
      <Tabs defaultValue="basic-info" className="w-full space-y-8">
        <TabsList className="border-b w-full justify-start">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="education">Experience & Education</TabsTrigger>
          <TabsTrigger value="certificate">Certifications & Links</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <div className="space-y-8">
            <BasicInfoForm />
            <div className="flex justify-end">
              <Button className="rounded-[6px]">Save Changes</Button>{" "}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="education">
          <div className="space-y-8">
            <ExperienceForm />
            <EducationForm />
            <div className="flex justify-end">
              <Button className="rounded-[6px]">Save Changes</Button>{" "}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="certificate">
          <div className="space-y-8">
            <CertificationForm />
            <SocialLinksForm />
            <div className="flex justify-end">
              <Button className="rounded-[6px]">Save Changes</Button>{" "}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <ProfileSettings />
          <ChangePassword />
          <DeleteAccount />
        </TabsContent>
      </Tabs>
    </div>
  );
}
