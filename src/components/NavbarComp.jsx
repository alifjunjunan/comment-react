import React from 'react'
import { Box, Menu, MenuButton, MenuList, MenuItem, Text, Icon, Spinner } from '@chakra-ui/react'
import { Link, Navigate } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../redux/actions'

const NavbarComp = (props) => {
    const { fullname } = useSelector((state) => {
        return {
            fullname: state.userReducer.fullname
        }
    })
    const dispatch = useDispatch()

    const printNamaUser = () => {
        if (fullname) {
            let temp = fullname.split(' ')
            return temp[0]
        } else {
            return (
                <Spinner />
            )
        }
    }

    return (
        <>
            <Box height='70px' backgroundColor='#7D97F4'>
                <Box padding='20px' display='flex' justifyContent='end'>
                    <Text fontSize={{ base: '15px', md: '18px' }} mx='20px' color='white' pt='5px'><Link to='/home'>Home</Link></Text>
                    <Menu>
                        <MenuButton fontSize={{ base: '15px', md: '18px' }} color='white' padding='5px 20px' background='#5155FF' borderRadius='5px'>Hey, {printNamaUser()} <Icon pt='4px' as={FiChevronDown} /></MenuButton>
                        <MenuList>
                            <Link to='/add/diary'>
                                <MenuItem>Add Diary</MenuItem>
                            </Link>
                            <Link to='/'>
                                <MenuItem onClick={() => dispatch(logoutAction())}>
                                    Log Out
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
        </>
    )
}

export default NavbarComp