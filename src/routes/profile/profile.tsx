import AboutMe from "@/components/profile/about";
import ContactInfo from "@/components/profile/contact-info";
import ProfileDocuments from "@/components/profile/documents";
import Header from "@/components/profile/header";
import Resume from "@/components/profile/resume";
import SocialLinks from "@/components/profile/social-links";

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
