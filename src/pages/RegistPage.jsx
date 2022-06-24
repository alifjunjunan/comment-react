import React, { useState } from 'react'
import { Box, Heading, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerAction } from '../redux/actions'

const RegistPage = (props) => {
    const [data, setData] = useState({ fullname: '', email: '', password: '', role: 'user', status: 'active' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handdleRegist = async () => {
        let temp = { ...data }
        try {
            let res = await dispatch(registerAction(temp))
            if (res.success) {
                setData({ fullname: '', email: '', password: '', role: 'user', status: 'active' })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box w={{ base: '80%', md: '70%' }} m='150px auto'>
                <Heading as='h3' size={{ base: 'sm', md: 'lg' }} textAlign='center'>Register to YourDiary</Heading>
                <Box mt='25px' w='100%' borderRadius='10px' boxShadow='lg' maxHeight='500px'>
                    <Box padding={{ base: '20px 40px', md: '20px 100px' }}>
                        <Heading as='h3' size={{ base: 'xs', md: 'md' }} textAlign='center'> user register </Heading>
                        <FormControl mt='10px'>
                            <FormLabel id='fullname' fontSize={{ base: '10px', md: '16px' }}>Full name</FormLabel>
                            <Input type='fullname' size={{ base: 'xs', md: 'md' }} name='fullname' value={data.fullname} onChange={(event) => handleInput(event)} />
                        </FormControl>
                        <FormControl mt='10px'>
                            <FormLabel id='email' fontSize={{ base: '10px', md: '16px' }}>Email</FormLabel>
                            <Input type='email' size={{ base: 'xs', md: 'md' }} name='email' value={data.email} onChange={(event) => handleInput(event)} />
                        </FormControl>
                        <FormControl mt='10px'>
                            <FormLabel id='password' fontSize={{ base: '10px', md: '16px' }}>Password</FormLabel>
                            <Input type='password' size={{ base: 'xs', md: 'md' }} name='password' value={data.password} onChange={(event) => handleInput(event)} />
                        </FormControl>
                        <Button colorScheme='cyan' color='white' size={{ base: 'xs', md: 'md' }} fontSize={{ base: '10px', md: '16px' }} mt='20px' w='100%' type='submit' onClick={handdleRegist}>Register</Button>
                        <Box mt='30px' display='flex' justifyContent='center'>
                            <Text fontSize={{ base: '11px', md: '15px' }} mr='5px'>Already have an account?</Text>
                            <Text p='1px 7px' fontWeight='bold' fontSize={{ base: '10px', md: '14px' }} backgroundColor='#0097e6' borderRadius='8px' color='white' boxShadow='md'>
                                <Link to='/'>
                                    Sign In
                                </Link>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RegistPage