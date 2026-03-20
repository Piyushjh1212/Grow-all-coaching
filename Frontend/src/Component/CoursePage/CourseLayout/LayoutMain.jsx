// LayoutMain.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Css/Layoutmain.css";
import "./Css/LectureComment.css";
import Lecturevideo from "./Lecturevideo";
import LectureSidebar from "./LectureSidebar";
import LectureComment from "./LectureComment";

export default function LayoutMain() {
  const { courseId, moduleId, lectureId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [currentModuleId, setCurrentModuleId] = useState(moduleId || null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null); // AWS presigned URL

  // ---------------- FETCH MODULES ----------------
  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setModules(data);

          // 🔹 Determine current module
          const currentModule = moduleId
            ? data.find((m) => m._id.toString() === moduleId.toString())
            : data[0];

          if (!currentModule) return;

          setCurrentModuleId(currentModule._id);

          // 🔹 Auto redirect if lectureId missing
          const firstLecture =
            currentModule.lectures?.[0] || currentModule.lessons?.[0];

          if (!lectureId && firstLecture) {
            navigate(
              `/course/${courseId}/module/${currentModule._id}/lecture/${firstLecture._id}`,
              { replace: true }
            );
          }
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId, moduleId, lectureId, navigate]);

  // ---------------- SELECT CURRENT LECTURE ----------------
  const selectedLecture = useMemo(() => {
    if (modules.length === 0 || !currentModuleId) return null;

    const currentModule = modules.find(
      (m) => m._id.toString() === currentModuleId.toString()
    );
    if (!currentModule) return null;

    const allLectures = [...(currentModule.lectures || []), ...(currentModule.lessons || [])];

    const lectureById = allLectures.find(
      (lec) => lec._id.toString() === lectureId?.toString()
    );

    return lectureById || allLectures[0] || null;
  }, [modules, currentModuleId, lectureId]);

  const currentLectureId = selectedLecture?._id || null;

  // ---------------- FETCH AWS PRESIGNED VIDEO URL ----------------
useEffect(() => {
  const fetchVideoUrl = async () => {
    if (!selectedLecture?._id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/presigned/video/${selectedLecture._id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setVideoUrl(data.url); // ✅ AWS presigned URL
    } catch (err) {
      console.error("Error fetching video URL:", err);
    }
  };

  fetchVideoUrl();
}, [selectedLecture]);

// console.log("Selected Lecture:", selectedLecture);
console.log("Modules fetched:", modules);
console.log("Current module ID:", currentModuleId);

  // ---------------- LOADING ----------------
  if (loading) return <div className="loader">Loading modules...</div>;
  if (!modules.length) return <div>No modules found for this course!</div>;

  return (
    <div className="cmlc-course-main-layout-container">
      {/* ---------------- VIDEO PLAYER + COMMENTS ---------------- */}
      <div className="cmllc-course-main-layout-left-container">
        {videoUrl ? (
          <Lecturevideo
            selectedVideo={videoUrl}
            currentLectureId={currentLectureId}
          />
        ) : (
          <h3>Loading Video...</h3>
        )}

        <LectureComment lectureId={currentLectureId} />
      </div>

      {/* ---------------- SIDEBAR ---------------- */}
      <div className="cmlrc-course-main-layout-right-container">
        <LectureSidebar
          modules={modules}
          courseId={courseId}
          currentModuleId={currentModuleId}
          setCurrentModuleId={setCurrentModuleId}
        />
      </div>
    </div>
  );
}