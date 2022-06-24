import React, { useState } from 'react'
import { Box, Heading, Text, Image, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { Link, Navigate } from 'react-router-dom'
import welcome from '../assets/welcome.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../redux/actions'

const LandingPage = (props) => {
    const [data, setData] = useState({ email: '', password: '' })
    const dispatch = useDispatch()

    const { role } = useSelector((state) => {
        return {
            role: state.userReducer.role
        }
    })

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handdleLogin = async () => {
        let temp = { ...data }
        try {
            let res = await dispatch(loginAction(temp.email, temp.password))
            if (res.success) {
                setData({ email: '', password: '' })
                console.log(res.success)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                role === 'user' && <Navigate to='/home' />
            }
            <Box w={{ base: '85%', md: '70%' }} m='100px auto'>
                <Heading as='h3' size={{ base: 'sm', md: 'lg' }} textAlign='center'>Welcome to YourDiary</Heading>
                <Box mt='25px' w='100%' borderRadius='10px' boxShadow='lg' maxHeight='500px'>
                    <Box padding='20px' display='flex'>
                        <Box flexBasis='50%' m={{ base: 'auto 0', md: '0' }}>
                            <Image src={welcome} w='100%' maxHeight='300px' objectPosition='center' objectFit='cover' alt='welcome' />
                        </Box>
                        <Box flexBasis='50%' marginLeft='20px'>
                            <Heading as='h3' size={{ base: 'xs', md: 'md' }} textAlign='center'> user Login </Heading>
                            <FormControl mt='10px'>
                                <FormLabel id='email' fontSize={{ base: '10px', md: '16px' }}>Email</FormLabel>
                                <Input type='email' size={{ base: 'xs', md: 'md' }} name='email' value={data.email} onChange={(event) => handleInput(event)} />
                            </FormControl>
                            <FormControl mt='10px'>
                                <FormLabel id='password' fontSize={{ base: '10px', md: '16px' }}>Password</FormLabel>
                                <Input type='password' size={{ base: 'xs', md: 'md' }} name='password' value={data.password} onChange={(event) => handleInput(event)} />
                            </FormControl>
                            <Button colorScheme='cyan' size={{ base: 'xs', md: 'md' }} fontSize={{ base: '10px', md: '16px' }} mt='10px' w='100%' type='submit' onClick={handdleLogin}>Login</Button>
                            <Box mt='15px' display='flex' justifyContent='center'>
                                <Text fontSize={{ base: '6px', md: '15px' }} mr='5px'>Don't have an account?</Text>
                                <Text p='1px 7px' fontWeight='bold' fontSize={{ base: '6px', md: '14px' }} backgroundColor='#0097e6' borderRadius='8px' color='white' boxShadow='md'>
                                    <Link to='/register'>
                                        Sign Up
                                    </Link>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LandingPage