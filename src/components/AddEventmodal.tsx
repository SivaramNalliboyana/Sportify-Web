"use client";

import { createEvent } from '@/actions/event.actions';
import { useAddEventStore } from '@/hooks/useAddEventModal';
import { montserrat } from '@/utils/fonts';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { TbPhotoPlus } from 'react-icons/tb';



const AddEventmodal = () => {
  const addEventState = useAddEventStore((state)=> state);
    const sports = ["Cricket", "Football", "Basketball", "Badminton"];
  
  
  
    const handleModalClose = () => {
      addEventState.clearState();
      addEventState.close();   
    };

    const handleEventSubmit = async () => {
      addEventState.setisPosting(true);

        try {
          if (addEventState.date === null){
            return;
          }

           const result = await createEvent(addEventState.title, "", addEventState.date, addEventState.city, addEventState.sport);
           
           if (result?.success){
            addEventState.clearState();
            addEventState.close();

            toast.success("Event created")
           }else{
             toast.success("Error creating event")
           }
        
        
          } catch (error) {
          
        }finally{
          addEventState.setisPosting(false);
        }
    }


  if (!addEventState.isOpen){
    return null;
  }

    
  return (
    
        <div onClick={handleModalClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg w-[600px] text-center">

           {/* Image upload section */}
          <h1 className={`${montserrat.className} text-black font-bold mb-4 mt-2 text-[18px] text-left`}>Upload photo</h1>
          <div onClick={() => document.getElementById("fileInput")?.click()} className="relative border-dashed border-2 p-10 flex justify-center items-center h-36 w-full overflow-hidden ">
            {addEventState.image ? (
              <img
                src={URL.createObjectURL(addEventState.image)}
                alt="Preview"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            ) : (
              <TbPhotoPlus size={40} />
            )}
          </div>

            {/* Image picker class hidden */}
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                disabled={addEventState.isPosting}
                onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    addEventState.setimage(e.target.files[0]);
                }
                }}
            />

          {/* Text input for hall name */}
          <div className="flex flex-col mb-4 mt-4">
            <input
              type="text"
              id="hallName"
              placeholder="Enter hall name"
              disabled={addEventState.isPosting}
              value={addEventState.title}
              onChange={(changedtitle)=> {addEventState.setTitle(changedtitle.target.value)}}
              
              className={`${montserrat.className} border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-text-grey`}
            />
          </div>

        <div className="flex flex-row mb-4 space-x-4 ">
          {/* Date and Time picker */}
          <DatePicker
            id="dateTime"
            selected={addEventState.date}
            onChange={(date) => addEventState.setDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            disabled={addEventState.isPosting}
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Pick date & time"
            className={`${montserrat.className} border border-gray-300 rounded-md px-4 py-2 w-full mr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 inset-y-0 left-0`}
          />


          {/* City Dropdown */}
            <select
              id="city"
              value={addEventState.city}
              disabled={addEventState.isPosting}
              onChange={(e) => addEventState.setCity(e.target.value)}
              className={`${montserrat.className} border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Choose a city</option>
              <option value="Dortmund">Dortmund</option>
              <option value="Munich">Munich</option>
              <option value="Berlin">Berlin</option>
              <option value="Frankfurt">Frankfurt</option>
            </select>
          </div>


          {/* Sport select button */}
          <div className="flex gap-2 mt-4 ">
            {sports.map((sport) => {
              const isSelected = addEventState.sport === sport;

              return (
                <button
                  key={sport}
                  onClick={() => addEventState.setSport(sport)}
                  className={`${montserrat.className} flex-1 px-4 py-2 rounded-md border cursor-pointer transition-colors
                    ${isSelected ? "bg-green-400 text-white border-green-400" : "bg-white text-gray-700 border-gray-300"}
                  `}
                >
                  {sport}
                </button>
              );
            })}
          </div>

          {/* Add event button */}
          

          <div onClick={handleEventSubmit} className="w-full p-4 mt-4 bg-green-400 rounded-md flex justify-center items-center transition cursor-pointer"> 
              <div className={`${montserrat.className} text-gray-800 font-bold text-[13px]`}>{addEventState.isPosting ? "Posting..." : "Add event"}</div>
          </div>

        </div>
      </div>
      )
}

export default AddEventmodal
