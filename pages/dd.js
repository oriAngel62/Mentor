import Demo from "../components/sched"
import { appointments } from '../public/demo_data/month_appointments';

export default function Dd() {
    return (
      <Demo appointments={appointments} />
    )
  }