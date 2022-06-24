import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NavbarComp from '../components/NavbarComp'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { postDiaryAction } from '../redux/actions/diaryAction';
import { useNavigate } from 'react-router-dom';
const AddDiaryPage = (props) => {
    const [content, setContent] = useState(null)
    const [tags, setTags] = useState([])
    const [isErrorTag, setIsErrorTag] = useState(false)
    const [isErrorFill, setIsErrorFill] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { iduser, fullname } = useSelector((state) => {
        return {
            iduser: state.userReducer._id,
            fullname: state.userReducer.fullname
        }
    })

    const printTags = () => {
        return tags.map((value, index) => {
            return (
                <Box backgroundColor='rgb(218, 216, 216)' display='inline-block' p={{ base: '.2em .35em', md: '.5em .75em' }} borderRadius='20px' key={index}>
                    <>{value}</>
                    <Box height={{ base: '17px', md: '22px' }} width={{ base: '17px', md: '22px' }} backgroundColor='rgb(48, 48, 48)' color='#fff'
                        borderRadius='50%' display='inline-flex' justifyContent='center' alignItems='center' marginLeft='.5em' paddingBottom='3px' fontSize='18px' cursor='pointer' onClick={() => removeTag(index)}>&times;</Box>
                </Box>
            )
        })
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
    const removeTag = (index) => {
        setTags(tags.filter((val, idx) => idx !== index))
        setIsErrorTag(false)
    }

    const handleSubmit = async () => {
        let temp = {
            iduser,
            fullname,
            comment: content,
            tag: tags,
            createdAt: new Date().getTime()
        }
        // console.log('isi content', content)
        if (content === null || content === '') return setIsErrorFill(true)
        if (tags.length === 0) return setIsErrorFill(true)
        try {
            let res = await dispatch(postDiaryAction(temp))
            if (res.success) {
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <NavbarComp isLoading={props.isLoading} />
            <Box w='80%' m='20px auto'>
                <Heading as='h3' size={{ base: 'md', md: 'lg' }} mb='15px'>write your daily life here</Heading>
                <Box p='20px' borderRadius='10px' boxShadow='md'>
                    <CKEditor
                        editor={ClassicEditor}
                        data='type here'
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data)
                        }}
                    />
                    <Heading as='h6' size='sm' my='10px'>Tags :</Heading>
                    <Box mt='1em' border='1.5px solid #E6E6E6' p='.5em' w='100%' display='flex' flexWrap='wrap' alignItems='center' borderRadius='10px' gap='.5em' >
                        {printTags()}
                        <input type="text" style={{ flexGrow: '1', padding: '.5em 0', border: 'none', outline: 'none' }} onKeyDown={handleKeyDown} placeholder='"enter" the tag here' />
                    </Box>
                    {isErrorTag ? (<Text color='red'>don't input the same tag</Text>) : isErrorFill ? (<Text color='red'>all must be filled</Text>) : <></>}
                    <Box mt='20px' display='flex' justifyContent='end'>
                        <Button colorScheme='whatsapp' onClick={handleSubmit} size='sm'>Submit</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AddDiaryPage