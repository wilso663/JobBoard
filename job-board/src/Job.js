import React from 'react';

function Job({job}) 
{
  return(
  <div className={'single-job'}>
    {job.title}
    {job.company}
  </div>
  )
}

export default Job;