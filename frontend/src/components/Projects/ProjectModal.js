import React from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{project?.title || 'Project Title'}</h2>
        <p>{project?.description || 'Project description'}</p>
      </div>
    </div>
  );
};

export default ProjectModal;