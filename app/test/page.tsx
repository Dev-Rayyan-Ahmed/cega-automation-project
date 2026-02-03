import test from '@/actions/test'


function page() {

    return (<div className='flex justify-center items-center h-screen'>
        <button onClick={test} className='bg-red-200 px-12 py-5 rounded-full'>run test</button>
    </div>
    );
    
}

export default page