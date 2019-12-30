import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Job from './Job';
import JobModal from './JobModal';


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});


function Jobs({jobs})
{

  //modal
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //pagination
  const numJobs = jobs.length;
  const pageSize = 30;
  const numPages = Math.ceil(numJobs/pageSize);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice(activeStep * pageSize, activeStep * pageSize + pageSize);


  // step == 0, show 0-29
  // step == 1, show 30-59

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return(
  <div className="job-list">
    <JobModal open={open} job={selectedJob} handleClose={handleClose}/>
    <Typography variant="h4" component="h1">
      Junior Level Software Jobs
    </Typography>
    <Typography variant="h3" component="h2">
      {numJobs} Jobs Found
    </Typography>
    {
      jobsOnPage.map(
        (job, i) => <Job key={i} job={job} onClick={() => { handleClickOpen(true); selectJob(job)} }/>
      )
    }
    <div>
      Page {activeStep + 1 } of {numPages}
    </div>
    <MobileStepper
      variant="progress"
      steps={numPages}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
      
    />


  </div>
  )
}


export default Jobs;