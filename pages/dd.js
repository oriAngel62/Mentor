import Demo from "../components/sched"
import ToolBox from "../components/toolBox";
import { appointments } from '../public/demo_data/month_appointments';

export default function Dd() {
    return (
      <ToolBox appointments={appointments} />
    )
  }