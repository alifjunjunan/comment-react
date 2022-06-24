import React, { useEffect, useState } from 'react'
import { Box, Text, Icon, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CgCloseO } from 'react-icons/cg'
import NavbarComp from '../components/NavbarComp'
import { useDispatch, useSelector } from 'react-redux'
import { getDiaryAction } from '../redux/actions'
import moment from 'moment'
import LoadingPage from './LoadingPage'
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_URL } from '../helper'

const HomePage = (props) => {
    const [dataDiary, setDataDiary] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const momentLocal = moment.locale()
    const colorTags = ['#FFC312', '#12CBC4', '#78e08f', '#40739e', '#8c7ae6']
    const dispatch = useDispatch()
    const { iduser } = useSelector((state) => {
        return {
            iduser: state.userReducer._id
        }
    })
    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        try {

            setIsLoading(true)
            let res = await dispatch(getDiaryAction(iduser))
            if (res.success) {
                setDataDiary(res.dataComments)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printcontent = () => {
        setTimeout(() => {
            if (dataDiary.length > 0) {
                dataDiary.forEach((value, index) => {
                    document.getElementById(`diary${value._id}`).innerHTML = value.comment
                })
            }
        }, 100);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${API_URL}/comment/${id}`)
                document.getElementById(`diary${id}`).remove()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                getComments()
            }
        })
    }

    const printDiary = () => {
        if (dataDiary.length > 0) {
            return dataDiary.map((value, index) => {
                return (
                    <Box h='245px' m='0 auto' borderRadius='10px' boxShadow='md' p='15px' mb='20px' flexBasis={{ base: '100%', md: '45%', lg: '45%', xl: '30%' }}  mt='20px' key={value._id}>
                        <Box display='flex' justifyContent='space-between'>
                            <Text fontSize='15px'>{moment(value.createdAt).format('LLL')}</Text>
                            <Box cursor='pointer' onClick={() => handleDelete(value._id)}><Icon as={CgCloseO} boxSize='1.2em' color='red' /></Box>
                        </Box>
                        <Box mt='8px' p='10px'>
                            <Link to={`/detail/diary/${value._id}`}>
                                <Box textAlign='left' fontSize='15px' noOfLines={6} h='135px' id={`diary${value._id}`}>
                                    {printcontent()}
                                </Box>
                            </Link>
                        </Box>
                        <Box mt='5px' fontSize='15px' position='relative' bottom={{ base: '-5px', md: '-5px' }}>
                            <Box display='flex'>
                                <Text>Tags :</Text>
                                <Box display='flex' ml='3px'>
                                    {value.tag.map((item, index) => { 
                                        
                                       if (index <= 4) return (
                                            <Box mr='5px' p='2px 5px' borderRadius='5px' backgroundColor={colorTags[Math.floor(Math.random() * 5)]} color='white' key={index}>
                                                <Text fontSize='12px' fontWeight='bold'> {item} </Text>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )
            })
        } else {
            return (
                <>
                    <Box m='30vh auto'>
                        <Heading as='h4' size='lg' color='#7f8c8d' textAlign='center'>it's still empty... 😁</Heading>
                    </Box>
                </>
            )
        }
    }
    return (
        <>
            {


            }
            {
                isLoading ?
                    <LoadingPage />
                    :
                    <>
                        <NavbarComp isLoading={props.isLoading} />
                        <Box w={{ base: '80%', md: '90%' }} m='0 auto' >
                            <Heading as='h3' size='lg' textAlign='center' mt='20px'>It's YourDiary</Heading>
                            <Box display='flex' flexWrap='wrap' >
                                {printDiary()}
                            </Box>
                        </Box>
                    </>

            }

        </>
    )
}

export default HomePage