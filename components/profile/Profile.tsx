import classes from './Profile.module.css';
import profileIcon from '../../public/profile.jpg';
import Card from '../ui/Card';
import PersonalInfo from './PersonalInfo';
import { User } from '@/model/User';
import Address from '../checkout/Address';
import { useRouter } from 'next/router';

export default function Profile({ user }: { user: User }) {
  const router = useRouter();
  let content = router.query.content ? router.query.content : 'user-info';

  const handlePageContent = (e: React.MouseEvent) => {
    const id = (e.target as HTMLDivElement).id;
    if (id === 'my-orders') router.push('/orders');
    else router.push(`/profile?content=${id}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={profileIcon.src} alt="profile-icon" />
        <Card className={classes.greeting}>
          <div>Hello,</div>
          <h3>{user.name}</h3>
        </Card>
        <Card>
          <div onClick={handlePageContent}>
            <div
              id="user-info"
              className={
                classes.option +
                ` ${content === 'user-info' && classes.selected}`
              }
            >
              Profile Information
            </div>
            <div
              id="manage-addresses"
              className={
                classes.option +
                ` ${content === 'manage-addresses' && classes.selected}`
              }
            >
              Manage Addresses
            </div>
            <div id="my-orders" className={classes.option}>
              My Orders
            </div>
          </div>
        </Card>
      </div>
      {content === 'user-info' && (
        <Card className={classes.main}>
          <PersonalInfo user={user} />
        </Card>
      )}
      {content === 'manage-addresses' && <Address addresses={user.addresses} />}
    </div>
  );
}
