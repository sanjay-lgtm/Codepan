import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdBookmark } from 'react-icons/md';

const Project = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm || "");
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredProjects = projects?.filter(project => 
        project?.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFiltered(filteredProjects);
    } else {
      setFiltered(null);
    }
  }, [searchTerm, projects]);

  const displayedProjects = filtered || projects;

  return (
    <div className='w-full py-6 flex items-center justify-center gap-4 flex-wrap'>
      {displayedProjects && displayedProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const { html, css, js, title, user } = project;
  const srcDoc = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4'
      whileHover={{ scale: 1.05 }}
    >
      <div className='w-full h-full bg-white overflow-hidden rounded-md shadow-md'>
        <iframe
          srcDoc={srcDoc}
          title={title || "Project Preview"}
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      <div className='flex items-center justify-start gap-3 w-full mt-2'>
        {user?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={user.photoURL}
            alt='User'
            referrerPolicy='no-referrer'
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <div className='w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center'>
            <p className='text-xl text-white font-semibold capitalize'>
              {user?.email?.[0]}
            </p>
          </div>
        )}
        <div>
          <p className='text-white text-lg capitalize'>{title}</p>
          <p className='text-gray-300 text-sm'>
            {user?.displayName || user?.email?.split("@")[0]}
          </p>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className='cursor-pointer ml-auto'
        >
          <MdBookmark className='text-primaryText text-3xl' />
        </motion.div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    html: PropTypes.string,
    css: PropTypes.string,
    js: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      photoURL: PropTypes.string,
      email: PropTypes.string,
      displayName: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Project;
