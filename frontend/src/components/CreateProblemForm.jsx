import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import Editor from "@monaco-editor/react"
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Input from './Input';


const problemSchema = z.object({

})

const sampleProblem = {

}

const CreateProblemForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {}
  });

  const {

  } = useFieldArray({
    control,
    name: "testcases"
  });


  const {

  } = useFieldArray({
    control,
    name: "tags"
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
  }

  const loadSampleData = () => {

  }

  return (
    <div className='mx-auto py-8 px-4 max-w-7xl'>

      <div className='card bg-base-100 shadow-xl'>

        <div className="w-screen max-w-3xl flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b border-gray-500">
          <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
            <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            Create Problem
          </h2>

          <button
            type='button'
            className='btn btn-secondary'
            onClick={loadSampleData}
          >
            <Download className='w-4 h-4' />
            Load Sample Data
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* title */}
            <Input
              error = {errors.title}
              register = {register}
              type= "text"
              name = "title"
              placeholder= "Enter problem title" 
              label = "Title"
            />

            {/* Description */}

            <Input
              error = {errors.description}
              register = {register}
              type= "text"
              name = "description"
              placeholder= "Enter problem description" 
              label = "Description"
            />

            {/* Difficulty */}

            <div className="form-control">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Difficulty
                  </span>
                </label>
                <select
                  className="select select-bordered md:text-lg text-base  rounded-sm w-full"
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.difficulty.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            

            {/* Tags  */}

            {/* Test Cases */}

          
        </form>
      </div>
    </div>
  )
}

export default CreateProblemForm