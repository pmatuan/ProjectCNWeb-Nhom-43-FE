import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import getCoordinates from "../../service/getLocation";
import compareCoordinates from "../../service/compareCoordinates";

function TableRow({ attandance }) {
  const [positionTeacher, setPositionTeacher] = useState(null);
  const [positionStudent, setPositionStudent] = useState(null);
  const [sameLocation, setSameLocation] = useState(null);

  useEffect(() => {
    const fetchTeacherPosition = async () => {
      const teacherPosition = await getCoordinates();
      setPositionTeacher(teacherPosition);
    };
    const fetchStudentPosition = async () => {
      const studentPosition = attandance.location;
      setPositionStudent(studentPosition);
    };

    fetchTeacherPosition();
    fetchStudentPosition();
  }, []);
  const ISOtoLocale = (ISOdate) => {
    const date = new Date(ISOdate);
    return date.toLocaleString();
  };

  useEffect(() => {
    console.log(positionTeacher);
    console.log(positionStudent);
    if (positionTeacher && positionStudent) {
      const checkSameLocation = compareCoordinates(positionStudent, positionTeacher);
      setSameLocation(checkSameLocation);
    }
  }, [positionTeacher, positionStudent]);

  useEffect(() => {
    console.log("sameLocation:", sameLocation);
  }, [attandance.user.device, attandance.device, sameLocation]);
  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography color="blue-gray">{attandance.user.name}</Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <Typography color="blue-gray">{attandance.user.email}</Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">{attandance.grade}</Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">
          {ISOtoLocale(attandance.createdAt)}
        </Typography>
      </td>
      <td className="p-4">
        <Typography color="blue-gray">
          {attandance.user.device === attandance.device && sameLocation 
            ? "Không"
            : "Có"}
        </Typography>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  attandance: PropTypes.object,
};

export default TableRow;
