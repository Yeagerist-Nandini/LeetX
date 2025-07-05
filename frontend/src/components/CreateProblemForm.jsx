import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
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
import { problemSchema } from '../lib/zodSchema';
import CodeEditor from './CodeEditor';

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

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
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testcases"
  });


  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setIsLoading(true);

      const res = await axiosInstance.post("/problems/create-problem", data);
      console.log(res.data);
      toast.success(res.data.message || "Problem created successfully");
      navigate("/");      
    } catch (error) {
      console.log(error);
      toast.error("Error creating problem");
    }
    finally{
      setIsLoading(false);
    }
  }

  const loadSampleData = () => {
      const sampleData = sampleStringProblem;

      //Reset the form with the sample data
      reset(sampleData);
  }


  return (
    <div className='container mx-auto py-8 px-4 max-w-7xl'>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8">

          {/* create problem */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full text-base md:text-lg"
                  {...register("title")}
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Description
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                  {...register("description")}
                  placeholder="Enter problem description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Difficulty */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base md:text-lg font-semibold">
                    Difficulty
                  </span>
                </label>

                <select
                  className="select select-bordered w-full text-base md:text-lg"
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Tags
                </h3>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => appendTag("")}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Tag
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tagFields.map((field, idx) => (
                  <div key={field.id} className='flex gap-2 items-center'>
                    <input
                      type="text"
                      className="input input-bordered flex-1"
                      {...register(`tags.${idx}`)}
                      placeholder='Enter tag'
                    />

                    <button
                      type='button'
                      onClick={() => removeTag(idx)}
                      className="btn btn-ghost btn-square btn-sm"
                      disabled={tagFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-error" />
                    </button>
                  </div>
                ))}
              </div>

              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
              )}
            </div>


            {/* Test Cases */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Test Cases
                </h3>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => appendTestCase({ input: "", output: "" })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Test Case
                </button>
              </div>

              <div className="space-y-6">
                {testCaseFields.map((field, idx) => (
                  <div key={field.id} className="card bg-base-100 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-base md:text-lg font-semibold">Test Case #{idx + 1}</h4>

                      <button
                        type='button'
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => removeTestCase(idx)}
                        disabled={testCaseFields.length === 1}>

                        <Trash2 className='w-4 h-4 mr-1' />Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="form-control">
                        <label className='label'>
                          <span className='label-text font-medium'>Input</span>
                        </label>

                        <textarea
                          className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                          {...register(`testcases.${idx}.input`)}
                          placeholder='Enter test case input'
                        />

                        {errors.testcases?.[idx]?.input && (
                          <p className="text-red-500 text-sm mt-1">{errors.testcases[idx].input.message}</p>
                        )}
                      </div>

                      <div className="form-control">
                        <label className='label'>
                          <span className='label-text font-medium'>Output</span>
                        </label>

                        <textarea
                          className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                          {...register(`testcases.${idx}.output`)}
                          placeholder='Enter test case output'
                        />

                        {errors.testcases?.[idx]?.output && (
                          <p className="text-red-500 text-sm mt-1">{errors.testcases[idx].output.message}</p>
                        )}
                      </div>
                    </div>

                  </div>
                ))}

              </div>

              {errors.testcases && !Array.isArray(errors.testcases) && (
                <p className="text-red-500 text-sm mt-1">{errors.testcases.message}</p>
              )}
            </div>

            {/* <CodeEditor/> */}

            {/* Additional Information */}
            <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Additional Information
              </h3>

              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Constraints</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                    {...register("constraints")}
                    placeholder="Enter problem constraints"
                  />
                  {errors.constraints && (
                    <p className="text-red-500 text-sm mt-1">{errors.constraints.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Hints (Optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                    {...register("hints")}
                    placeholder="Enter hints for solving the problem"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Editorial (Optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-32 w-full p-3 resize-y"
                    {...register("editorial")}
                    placeholder="Enter problem editorial/solution explanation"
                  />
                </div>
              </div>
            </div>

            <div className="card-actions justify-end pt-4 border-t">
              <button type="submit" className="btn btn-primary btn-lg gap-2">
                {isLoading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default CreateProblemForm