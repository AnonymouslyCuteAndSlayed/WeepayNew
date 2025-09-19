import React from 'react';
import { Card } from 'react-bootstrap';
import { Clock10 } from 'lucide-react';
import { getDepartmentAvatar } from "../../../common/dashboard/ActivityAvatar/activityAvatar.jsx";



function ActivityFeed() {
  const activities = [
    { department: "Finance", time: "2 hrs ago", description: "Anna R. issued invoice #INV-1023" },
    { department: "Admin", time: "6 hrs ago", description: "Sally G. approved a proposal" },
    { department: "Project Manager", time: "1 day ago", description: "Mark L. updated project status" },
    { department: "IT", time: "1 day ago", description: "John D. deployed security update" },
    { department: "IT", time: "1 day ago", description: "John D. deployed security update" },
    { department: "IT", time: "1 day ago", description: "John D. deployed security update" },
    { department: "IT", time: "1 day ago", description: "John D. deployed security update" },
    { department: "IT", time: "1 day ago", description: "John D. deployed security update" },



  ];

  return (
    <Card className="activity-sidebar" style={{ borderRadius: "20px", border: "none" }}>
      <Card.Body className="activity-body">
        <div className='activity-inner'>
        <div className="section-header-minimal">
          <span><Clock10 /></span>
          <h3 className="section-title-small">
            Recent Activities Feed
            <br />
            <span className="activity-subtitle">See what others are doing!</span>
          </h3>
        </div>

        <div className="activity-day">Today</div>

        <div className="activity-feed">
          {activities.map((activity, i) => {
            const { letter, className } = getDepartmentAvatar(activity.department);
            return (
              <div className="activity-item" key={i}>
                <div className={`activity-avatar ${className}`}>{letter}</div>
                <div className="activity-content">
                  <div className="activity-title">
                    {activity.department}
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className="activity-description">{activity.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ActivityFeed;
