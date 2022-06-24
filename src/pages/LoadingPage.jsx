import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import loading from '../assets/loading.gif'
const LoadingPage = () => {
    return (
        <>
            <Box w='30%' m='25vh auto'>
                <Image src={loading} w='100%' objectPosition='center' objectFit='cover' />
            </Box>
        </>
    )
}

export default LoadingPage