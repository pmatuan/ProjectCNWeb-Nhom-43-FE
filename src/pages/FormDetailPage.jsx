import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import MainLayout from "../layouts/MainLayout";
import QuestionList from "../components/Question/QuestionList";
import AttendanceTable from "../components/Attendance/AttendanceTable";

function FormDetail() {
  const [form, setForm] = useState(null);
  const [attendances, setAttendances] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const getForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/forms/${id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(response.data.data.form);
        setForm(response.data.data.form);
      } catch (err) {
        console.error(err);
      }
    };
    getForm();
  }, [id]);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/forms/${id}/attendances`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setAttendances(response.data.data.attendances);
      } catch (err) {
        console.error(err);
      }
    };
    getAttendance();
  }, [id]);

  //Đợi useEffect chạy
  if (!form || !attendances) {
    return <div>Loading...</div>;
  }

  const data = [
    {
      label: "Câu hỏi",
      value: 0,
      desc: (
        <Fragment>
          <Typography className="my-3">Bài kiểm tra: {form.name}</Typography>
          <Typography className="mb-3">
            Thời gian làm bài: {form.timeLimit} phút
          </Typography>
          <QuestionList questions={form.quiz.questions} />
        </Fragment>
      ),
    },
    {
      label: "Danh sách nộp bài",
      value: 1,
      desc: <AttendanceTable attendances={attendances} />,
    },
  ];

  return (
    <MainLayout>
      <div className="w-full max-w-5xl my-10 min-h-screen">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-blue-500" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default FormDetail;
