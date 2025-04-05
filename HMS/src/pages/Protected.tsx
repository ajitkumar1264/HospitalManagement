import useUserRights from "../hooks/UserRights";

function Protected() {
  const { data, error, loading } = useUserRights();

  return (
    <div>
      {/* <h1>Protected</h1>

      {loading && <p>Loading user rights...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <h3>API Response:</h3>
          <p>{data}</p>
        </div>
      )} */}
    </div>
  );
}

export default Protected;
