import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";

const DetailCard = ({ callDetails }) => {
  const {
    call_type,
    created_at,
    duration,
    direction,
    from,
    to,
    via,
    outbound,
    is_archived,
  } = callDetails;

  return (
    <div
      id="detail-card"
      className=" bg-white my-5 mx-2 flex shadow-lg rounded-lg p-3"
    >
      <section id="first-row" className="flex">
        {/* If direction is missing in data then by default call in incoming */}
        {direction === "outbound" ? (
          <CallMadeIcon sx={{ width: "20px" }} />
        ) : (
          <CallReceivedIcon sx={{ width: "20px" }} />
        )}
        <div>{from}</div>
      </section>
      <section id="second-row"></section>
      <section id="third-row"></section>
    </div>
  );
};

export default DetailCard;
