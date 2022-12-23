import React, { useContext } from 'react';
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../contextStore/auth-context'

const Home = () => {
  const cntxt = useContext(AuthContext)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={cntxt.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
