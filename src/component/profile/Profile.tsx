import HeaderDetails from './common/HeaderDetails';
import ProfileCard from './common/Profile';
import ProfileTabs from './common/ProfileTabs';

const Profile = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12 font-sans">
      <HeaderDetails />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <ProfileCard className="lg:col-span-4" />

        <main className="lg:col-span-8 flex flex-col">
          <ProfileTabs />
        </main>
      </div>
    </div>
  );
};

export default Profile;
