import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NavbarComp from '../components/NavbarComp'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { editDiaryAction } from '../redux/actions/diaryAction';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import moment from 'moment';
import LoadingPage from './LoadingPage';

const DetailDairyPage = (props) => {
    const [content, setContent] = useState(null)
    const [tags, setTags] = useState([])
    const [updatedAt, setUpdatedAt] = useState(null)
    const [isErrorTag, setIsErrorTag] = useState(false)
    const [isErrorFill, setIsErrorFill] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [btnEdit, setBtnEdit] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getDiaryById()
    }, [])

    const getDiaryById = async () => {
        let res = await axios.get(`${API_URL}/comment/${id}`)
        if (res.data.success) {
            // console.log('isi diary by id', res.data.dataComment)
            setContent(res.data.dataComment[0].comment)
            setTags(res.data.dataComment[0].tag)
            setIsLoading(false)
            if (res.data.dataComment[0].updatedAt) {
                setUpdatedAt(res.data.dataComment[0].updatedAt)
            }
        }
    }

    const printTags = () => {
        if (tags.length > 0) {
            return tags.map((value, index) => {
                return (
                    <Box backgroundColor='rgb(218, 216, 216)' display='inline-block' p={{ base: '.2em .35em', md: '.3em .65em' }} borderRadius='20px' key={index}>
                        <>{value}</>
                        <Box height={{ base: '17px', md: '19px' }} width={{ base: '17px', md: '19px' }} backgroundColor='rgb(48, 48, 48)' color='#fff'
                            borderRadius='50%' display={btnEdit ? 'none' : 'inline-flex'} justifyContent='center' alignItems='center' marginLeft='.5em' paddingBottom='3px' fontSize='18px' cursor='pointer' onClick={() => removeTag(index)}>&times;</Box>
                    </Box>
                )
            })
        }
    }
    const removeTag = (index) => {
        setTags(tags.filter((val, idx) => idx !== index))
        setIsErrorTag(false)
    }

    const handleKeyDown = (event) => {
        // jika user tidak menekan enter, maka return
        if (event.key !== 'Enter') return
        // ambil value dari input
        const value = event.target.value
        // jika valuenya kosong, maka return
        if (!value.trim()) return
        //jika memasukan tags yang sama, maka return
        if (tags.includes(value)) return setIsErrorTag(!isErrorTag)
        // masukan value tag ke dalam array
        setTags([...tags, value])
        // kosongkan kembali inputan
        event.target.value = ''
        setIsErrorTag(false)
    }

    const handleSubmit = async () => {
        let temp = {
            comment: content,
            tag: tags,
            updatedAt: new Date().getTime()
        }
        if (content === null || content === '') return setIsErrorFill(true)
        if (tags.length === 0) return setIsErrorFill(true)
        try {
            let res = await dispatch(editDiaryAction(temp, id))
            if (res.success) {
                navigate('/home')
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleBtn = () => {
        if (btnEdit) {
            setBtnEdit(false)
        } else {
            setBtnEdit(true)
        }
    }
    return (
        <>
            {
                isLoading ?
                    <LoadingPage />
                    :
                    <>
                        <NavbarComp isLoading={props.isLoading} />
                        <Box w='80%' m='20px auto'>
                            <Heading as='h3' size={{ base: 'md', md: 'lg' }} mb='15px'>It's yourDiary</Heading>
                            <Box p='20px' borderRadius='10px' boxShadow='md'>
                                {updatedAt ? <Text fontSize='13px' my='10px'>last edited {moment(updatedAt).format('LLL')}</Text> : <></>}
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={content ? content : 'type here'}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data)
                                    }}
                                    disabled={btnEdit}
                                />
                                <Heading as='h6' size='sm' my='10px'>Tags :</Heading>
                                <Box mt='1em' border='1.5px solid #E6E6E6' p='.5em' w='100%' display='flex' flexWrap='wrap' alignItems='center' borderRadius='10px' gap='.5em' >
                                    {printTags()}
                                    <input type="text" style={{ flexGrow: '1', padding: '.5em 0', border: 'none', outline: 'none' }} onKeyDown={handleKeyDown} disabled={btnEdit} placeholder={!btnEdit ? '"enter" the tag here' : ''} />
                                </Box>
                                {isErrorTag ? (<Text color='red'>don't input the same tag</Text>) : isErrorFill ? (<Text color='red'>all must be filled</Text>) : <></>}
                                <Box mt='20px' display='flex' justifyContent='end'>
                                    {
                                        btnEdit ?
                                            <Button colorScheme='yellow' size='sm' onClick={handleBtn}>Edit</Button>
                                            :
                                            <>
                                                <Button colorScheme='whatsapp' size='sm' onClick={handleSubmit} mr='10px'>Submit</Button>
                                                <Button colorScheme='blackAlpha' size='sm' onClick={handleBtn}>cancel</Button>
                                            </>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </>
            }

        </>
    )
}

export default DetailDairyPage