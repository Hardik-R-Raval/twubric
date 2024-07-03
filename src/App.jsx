import React, { useState, useEffect } from 'react';
import FollowerCard from './components/FollowerCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import twitter from './assets/twitter.png';

const App = () => {
  const [followers, setFollowers] = useState([]);
  const [sortedFollowers, setSortedFollowers] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({ criteria: '', order: 'asc' });

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json');
        const data = await response.json();
        setFollowers(data);
        setSortedFollowers(data);
      } catch (error) {
        console.error('Error fetching follower data:', error);
      }
    };

    fetchFollowers();
  }, []);

  const removeFollower = (uid) => {
    const updatedFollowers = sortedFollowers.filter(follower => follower.uid !== uid);
    setFollowers(updatedFollowers);
    setSortedFollowers(updatedFollowers);
  };

  const sortBy = (criteria) => {
    let order = 'asc';
    if (sortCriteria.criteria === criteria && sortCriteria.order === 'asc') {
      order = 'desc';
    }
    const sorted = [...sortedFollowers].sort((a, b) => {
      if (criteria === 'joinDate') {
        const dateA = new Date(a.join_date * 1000);
        const dateB = new Date(b.join_date * 1000);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return order === 'asc' ? a.twubric[criteria] - b.twubric[criteria] : b.twubric[criteria] - a.twubric[criteria];
      }
    });
    setSortedFollowers(sorted);
    setSortCriteria({ criteria, order });
  };

  const filterByJoinDate = () => {
    if (startDate && endDate) {
      const filtered = followers.filter(follower => {
        const joinDate = new Date(follower.join_date * 1000);
        return joinDate >= startDate && joinDate <= endDate;
      });
      setSortedFollowers(filtered);
    } else {
      setSortedFollowers(followers);
    }
  };

  const resetFilters = () => {
    setSortedFollowers(followers);
    setStartDate(null);
    setEndDate(null);
    setSortCriteria({ criteria: '', order: 'asc' });
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex flex-col md:flex-row items-center justify-between mb-8">
        <img src={twitter} alt="Logo" className="h-12 mb-4 md:mb-0" />
        <h1 className="text-2xl font-bold">Twubric Follower Review</h1>
      </header>

      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex flex-wrap">
          {['total', 'friends', 'influence', 'chirpiness'].map((criteria) => (
            <button 
              key={criteria} 
              onClick={() => sortBy(criteria)} 
              className={`px-4 py-2 mx-2 my-2 md:my-0 bg-gray-200 rounded ${sortCriteria.criteria === criteria ? 'bg-gray-400' : ''}`}
            >
              {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
            </button>
          ))}
          <button 
            onClick={resetFilters} 
            className="px-4 py-2 mx-2 my-2 md:my-0 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        </div>

        <div className="filter flex flex-col md:flex-row items-center space-x-4">
          <button
            onClick={() => sortBy('joinDate')}
            className={`px-4 py-2 bg-gray-200 rounded ${sortCriteria.criteria === 'joinDate' ? 'bg-gray-400' : ''}`}
          >
            Join Date
          </button>
          <div className="flex flex-col md:flex-row md:space-x-2 items-center space-y-2 md:space-y-0">
            <label className="font-semibold">Filter by Join Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              className="border rounded px-2 py-1 w-full md:w-auto"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              className="border rounded px-2 py-1 w-full md:w-auto"
            />
            <button
              onClick={filterByJoinDate}
              className="px-4 py-2 bg-blue-500 text-white rounded w-full md:w-auto"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedFollowers.map(follower => (
          <FollowerCard key={follower.uid} follower={follower} removeFollower={removeFollower} />
        ))}
      </div>

      <footer className="mt-8 text-center">
        <p>By Hardik Raval</p>
      </footer>
    </div>
  );
};

export default App;
