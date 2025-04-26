import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./TopicL.css";

function TopicL() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribeTopics = onSnapshot(
      collection(db, "topics"),
      (topicsSnapshot) => {
        const topicsData = topicsSnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
          groupCount: 0,
        }));

        setTopics(topicsData);
        const unsubscribers = topicsData.map((topic) => {
          const groupsQuery = query(
            collection(db, "groups"),
            where("topicId", "==", doc(db, "topics", topic.id))
          );

          return onSnapshot(groupsQuery, (groupsSnapshot) => {
            setTopics((prev) =>
              prev.map((t) =>
                t.id === topic.id
                  ? { ...t, groupCount: groupsSnapshot.size }
                  : t
              )
            );
            setLoading(false);
          });
        });

        return () => unsubscribers.forEach((unsub) => unsub());
      }
    );

    return () => unsubscribeTopics();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>ກຳລັງໂຫຼດຫົວຂໍ້...</p>
      </div>
    );

  return (
    <div className="page-container">
      <h1 className="page-title">ຫົວຂໍ້ທັງຫມົດ</h1>
      <p className="page-subtitle">ເລືອກຫົວຂໍ້ທີ່ສົນໃຈ ແລະ ຕ້ອງການ</p>

      <div className="topic-grid">
        {topics.map((topic) => {
          const isFull = topic.groupCount >= topic.maxGroups;
          const isInactive = topic.status === "inactive";
          return (
            <div
              key={topic.id}
              className={`topic-card ${isInactive ? "unavailable" : ""} ${
                isFull ? "full" : ""
              }`}
            >
              <div className="topic-header">
                <h2>{topic.name}</h2>
                {topic.isPopular && (
                  <span className="popular-badge">ยอดนิยม</span>
                )}
              </div>

              <div className="topic-content">
                {topic.description && (
                  <p className="topic-description">{topic.description}</p>
                )}
                <div className="topic-stats">
                  <div className="topic-stat">
                    <span className="stat-label">ສະຫມັກແລ້ວ</span>
                    <div className="stat-value">
                      <div className="progress-container">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${
                              (topic.groupCount / topic.maxGroups) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span>
                        {topic.groupCount}/{topic.maxGroups} ກຸ່ມ
                      </span>
                    </div>
                  </div>
                  <div className="topic-stat">
                    <span className="stat-label">ສະມາຊິກຕໍ່ກຸ່ມ</span>
                    <span className="stat-value">
                      {topic.membersPerGroup} ຄົນ
                    </span>
                  </div>
                </div>
              </div>

              <div className="topic-footer">
                {isInactive && (
                  <div className="status-badge closed">ปิดรับสมัคร</div>
                )}
                {isFull && !isInactive && (
                  <div className="status-badge full">ເຕັມ</div>
                )}
                {/* Allow viewing groups even if full */}
                {!isInactive && (
                  <Link to={`/topics/${topic.id}`} className="view-button">
                    {isFull ? "ເບິ່ງລາຍລະອຽດ" : "ສະຫມັກ"}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {topics.length === 0 && (
        <div className="empty-state">
          <p>ไม่พบหัวข้อที่เปิดให้ลงทะเบียน</p>
        </div>
      )}
    </div>
  );
}

export default TopicL;
