import classes from './Profile.module.css';
import profileIcon from '../../public/profile.jpg';
import Card from '../ui/Card';
import PersonalInfo from './PersonalInfo';
import { User } from '@/model/User';

export default function Profile({ user }: { user: User }) {
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={profileIcon.src} alt="profile-icon" />
        <Card className={classes.greeting}>
          <div>Hello,</div>
          <h3>{user.name}</h3>
        </Card>
        <Card className={classes.options}>
          <div>Profile Information</div>
          <div>Manage Addresses</div>
          <div>My Orders</div>
        </Card>
      </div>
      <Card className={classes.main}>
        <PersonalInfo user={user} />
      </Card>
    </div>
  );
}
