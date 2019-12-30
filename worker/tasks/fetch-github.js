

var fetch = require('node-fetch');
var redis = require("redis"), client = redis.createClient();

const {promisify} = require('util');

const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub()
{
  let resultCount = 1, onPage = 0;
  const jobsList = [];

  //fetch all pages

  while(resultCount > 0){
    const response = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await response.json();
    jobsList.push(...jobs);
    resultCount = jobs.length;
    console.log('got ' + jobs.length + ' jobs');
    onPage++;
  }
  console.log('got ' + jobsList.length + ' jobs in total');
  //filter steps
  const jrJobs = jobsList.filter(job => {
    const jobTitle = job.title.toLowerCase();
    let isJunior = true;
    let filterKeywords = ['senior','manager','sr.','architect']

    if(filterKeywords.some(substring => jobTitle.includes(substring))){
      isJunior = false;
    }

    return isJunior;
  })

  console.log('filtered down to ' + jrJobs.length + ' jobs');
  
  

  //set in redis
  const success = await setAsync('github', JSON.stringify(jrJobs));

  console.log({success});

}

fetchGithub();

module.exports = fetchGithub;