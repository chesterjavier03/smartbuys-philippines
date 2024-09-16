import { redirect } from 'next/navigation';
import DashboardLoadingPage from './loading';

const Dashboard = () => {
  redirect('/dashboard/settigs');
};

export default Dashboard;
