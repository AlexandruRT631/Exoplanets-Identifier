import LoadingSpinner from "./LoadingSpinner";

type ActionStatusProps = {
  successMessage: string;
  errorMessage: string;
  isLoading: boolean
};

const ActionStatus = ({
  successMessage,
  errorMessage,
  isLoading
}: ActionStatusProps) => {
  return (
    <div>
      {successMessage && (<label style={{ marginLeft: "20px", color: '#eaeaea' }}>{successMessage}</label>)}
      {errorMessage && (<label style={{ marginLeft: "20px", color: 'darkred' }}>{errorMessage}</label>)}
      {isLoading && (<LoadingSpinner />)}
    </div>
  )
}

export default ActionStatus;