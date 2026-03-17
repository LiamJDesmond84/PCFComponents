import { Icon, Persona, PersonaSize, initializeIcons  } from '@fluentui/react';
import * as React from 'react';
import '../css/TaskCard.css';
import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Task, User } from '../types';

initializeIcons();

export interface ITaskCardProps {
    tasks: Task[];
    user: User;
    expanded: boolean
}


const TaskCard = ({tasks, user,expanded}: ITaskCardProps) => {
    const [categoryExpanded, setCategoryExpanded] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setCategoryExpanded(prev => ({
            ...prev,
            [category]: !prev[category]
        }))
    }
    let tasksDone = 0;
    let tasksNotDone = 0;
    let estimatedHours = 0;
    let spentHours = 0;

    const categoryColors: Record<string, string> = {
        "Ready": "#0078d4",
        "In Progress": "#ffc107",
        "Done": "#28a745"
    }
    
    const categoryCounts: Record<string, number> = {
        Ready: 0,
        "In Progress": 0,
        Review: 0,
    }



    tasks.forEach(task => {
        if(task.status === "Done") tasksDone++;
        else if(task.status === "Not Done") tasksNotDone++;

        estimatedHours += Number(task.estimatedHours);
        spentHours += Number(task.spentHours);

        if(categoryCounts[task.category] !== undefined) {
        categoryCounts[task.category]++;
    }
    })
    const totalTasks = tasksDone + tasksNotDone
  return (
      <div className={`task-card ${expanded ? "expanded" : "collapsed"}`}>
          <div className="task-card-header">
              <Persona
                  imageUrl={user.profileImage}
                  text={user.name}
                  size={PersonaSize.size48}
                  styles={{ primaryText: { fontWeight: 'bold' } }
                  }
              />
              <Icon iconName={expanded ? "DoubleChevronUp" : "DoubleChevronDown"} className='toggle-icon' />
          </div>
          <div className="task-counts">
              <div>
                  <div className="count">10</div>
                  <div className="label">Not Done</div>
              </div>

              <div>
                  <div className="count done">5</div>
                  <div className="label">Done</div>
              </div>
          </div>

        <div className="progress-bar">
        {["In Progress", "Review", "Ready", "Undefined"].map(category => {
          const taskCount = tasks.filter(task =>
            category === "Undefined"
              ? !task.category
              : task.category === category
          ).length

          const withPercent =
            totalTasks > 0 ? (taskCount / totalTasks) * 100 : 0
          return (
            <div
              key={category}
              className="progress-bar-segment"
              style={{
                width: `${withPercent}%`,
                background:
                  category === "undefined" ? "#999" : categoryColors[category],
              }}
            ></div>
          )
        })}
      </div>

        <div className="progress-circle">
            <CircularProgressbar
            value={totalTasks > 0 ? (tasksDone / totalTasks) * 100 : 0}
            text={`${(totalTasks > 0 ? (tasksDone / totalTasks) * 100 : 0).toFixed(0)}%`}
            styles={buildStyles({pathColor: '#28a745', textColor: '#333'})}
            
            />
        </div>
        <div className="progress-circle">
            <CircularProgressbar
            value={estimatedHours > 0 ? (spentHours / estimatedHours) * 100 : 0}
            text={`${(estimatedHours > 0 ? (spentHours / estimatedHours) * 100 : 0).toFixed(0)}%`}
            styles={buildStyles({pathColor: '#28a745', textColor: '#333'})}
            
            />
        </div>

      <div className="hours-info">
        <div className="label">Estimated</div>
        <span>{estimatedHours}</span>
      </div>
      {["Ready", "In Progress", "Review"].map(category => (
        <div key={category} className="task-category">
          <div
            className="category-header"
            style={{ color: categoryColors[category] }}
            onClick={() => toggleCategory(category)}
          >
            {category} ({categoryCounts[category]})
            <Icon
              iconName={
                categoryExpanded[category]
                  ? "ChevronUpSmall"
                  : "ChevronDownSmall"
              }
              className="category-toggle-icon"
            />
          </div>
          {categoryExpanded[category] &&
            tasks
              .filter(task => task.category === category)
              .map(task => (
                <div key={task.id} className="task-item">
                  <span>{task.title}</span>
                  <span className="task-time">{task.estimate}</span>
                </div>
              ))}
        </div>
      ))}
    </div>
  )
}

export default TaskCard