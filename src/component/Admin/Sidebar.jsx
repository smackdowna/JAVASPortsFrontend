import { Button, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiLogoutBoxLine, RiRadarFill, RiTBoxFill, RiUser3Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/userAction';

const Sidebar = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const logoutHandler =()=>{
      dispatch(logOut());
    }

  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      <Heading
          children="JavaSports"
          my="16"
          textAlign={['center', 'left']}
        />
      <LinkButton Icon={RiDashboardFill} text="Dashboard" url={'dashboard'} active={location.pathname ==='/dashboard'}/>
      <LinkButton Icon={RiAddCircleFill} text="Create Product" url={'createproduct'} active={location.pathname ==='/createproduct'}/>
      <LinkButton Icon={RiEyeFill} text="Products" url={'products'} active={location.pathname ==='/products'}/>
      <LinkButton Icon={RiUser3Fill} text="Users" url={'users'} active={location.pathname ==='/users'}/>
      <LinkButton Icon={RiTBoxFill} text="Orders" url={'orders'} active={location.pathname ==='/orders'}/>
      <LinkButton Icon={RiRadarFill} text="CreateCoupons" url={'createcoupons'} active={location.pathname ==='/createcoupons'}/>
      <LinkButton Icon={RiRadarFill} text="Coupons" url={'coupons'} active={location.pathname ==='/coupons'}/>
      <LinkButton Icon={RiLogoutBoxLine} text="Logout" url={''} logoutHandler={logoutHandler} />
    </VStack>
  );
};

export default Sidebar;


function LinkButton({url,logoutHandler,Icon,text,active}){

  

    return(
        <Link to={`/${url}`}>
        <Button fontSize={'larger'} variant="ghost" colorScheme={active?'purple':"" } onClick={logoutHandler} >
          <Icon style={{ margin: '4px' }} />
          {text}
        </Button>
      </Link>
    )
}