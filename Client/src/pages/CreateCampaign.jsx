import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { ethers } from 'ethers';

import { money } from '../assets';
import {CustomButton, FormField, Loader} from '../components';
import {checkIfImage} from '../utils';
import {useStateContext} from '../context'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const  [isLoading, setIsLoading] = useState(false);
  const {createCampaign} = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFiledChange = (fieldName, e) => {
    setForm({...form, [fieldName]: e.target.value});
  }

  const handleSubmit =  async(e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exist) => {
      if (exist) {
        setIsLoading(true)
        await createCampaign ({...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      }else {
        alert('please upload a valid image')
        setForm({...form, image: '' })
      }
    })
    console.log(form)
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10'>
      {isLoading && <Loader/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25p] text-[18px] leading-[38px] text-white'>Start a campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName = "Your Name *"
            placeholder = "John Doe"
            inputType ="text"
            value={form.name}
            handleChange={(e) => handleFormFiledChange ('name', e)}
          />

          <FormField
            labelName = "Campaign Title *"
            placeholder = "Write a title"
            inputType = "text"
            value={form.title}
            handleChange={(e) => handleFormFiledChange ('title', e)}
          />
        </div>

        <FormField
            labelName = "Story *"
            placeholder = "Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFiledChange ('description', e)}
          />
        
      <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
        <img src={money} alt="money" className='w-[40px] h-[40px] object-contain'/>
        <h4 className='font-epilogue font-bold text[25px] text-white ml-[20px]'>You will get 100% of the raised amount</h4>
      </div>
      
      <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName = "Goal *"
            placeholder = "ETH 0.50"
            inputType = "text"
            value={form.target}
            handleChange={(e) => handleFormFiledChange ('target', e)}
          />

          <FormField
            labelName = "End Date *"
            placeholder = "End Date"
            inputType = "date"
            value={form.deadline}
            handleChange={(e) => handleFormFiledChange ('deadline', e)}
          />
        </div>

          <FormField
            labelName = "Campaign Image"
            placeholder = "Place Image URL of your Campaign"
            inputType = "url"
            value={form.image}
            handleChange={(e) => handleFormFiledChange ('image', e)}
          />  

          <div className='flex justify-center items-center mt-[40px] '>
            <CustomButton
              btnType="submit"
              title= "Sumbit new Campaign "
              styles="bg-[#1dc071]"  
            />
          </div>          
        
      </form>
    </div>
  )
}

export default CreateCampaign
