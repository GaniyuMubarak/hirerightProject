import AboutMe from "@/components/candidate/profile/about";
import ContactInfo from "@/components/candidate/profile/contact-info";
import ProfileDocuments from "@/components/candidate/profile/documents";
import Header from "@/components/candidate/profile/header";
import Resume from "@/components/candidate/profile/resume";
import SocialLinks from "@/components/candidate/profile/social-links";

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-6 ">
      <Header />
      <AboutMe />
      <ProfileDocuments />
      <ContactInfo />
      <Resume />
      <SocialLinks />
    </div>
  );
}
