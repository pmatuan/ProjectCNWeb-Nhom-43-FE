import { useParams } from "react-router-dom";

function JoinPasswordPage() {
  const { id } = useParams();
  return <div>Please provide password to join the exam {id}</div>;
}

export default JoinPasswordPage;
