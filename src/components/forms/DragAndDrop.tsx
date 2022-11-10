import React, { useCallback, useState, CSSProperties } from 'react'
import { useDropzone } from 'react-dropzone'
import MoonLoader from 'react-spinners/MoonLoader'

import upload from '../../assets/images/upload.svg'

import request from '../../helpers/request'
import { DragAndDropProps } from '../../types'

const DragAndDrop = ({
  label,
  data,
  setData,
  color,
  small,
  className,
}: DragAndDropProps) => {
  const override: CSSProperties = {
    borderColor: 'rgba(0, 0, 0, 0.6)',
    background: 'transparent',
  }

  const [file, setFile] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(
    (files: any[]) => {
      setLoading(true)

      if (files[0].size / 10 ** 6 > 2) {
        setError('File is greater than 2mb')
        setLoading(false)
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onerror = () => {
        setError('Unable to read file')
        setLoading(false)
      }
      reader.onload = async () => {
        const formData = new FormData()
        formData.append('file', files[0])

        try {
          const {
            files: uploadedFiles,
          }: { files: { path: string }[] } = await request({
            url: '/onboarding/upload',
            method: 'post',
            body: formData,
            type: 'form-data',
          })

          setFile(files[0].name)
          setData(uploadedFiles[0].path)
          setError('')
          setLoading(false)
        } catch (err: any) {
          setError(
            err.response?.data?.message || err.message || 'an error occurred',
          )
          setLoading(false)
        }
      }
    },
    [setData, setFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
      'application/pdf': ['.pdf'],
    },
  })

  return (
    <>
      {!small ? <label className="label text-black mb-2">{label}</label> : null}
      <div
        className={`flex flex-col items-center drag-drop p-[1.563rem] ${
          error ? 'error' : ''
        } ${className ? className : ''}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className={small ? '' : 'mb-[1.3rem]'}>
            <MoonLoader
              cssOverride={override}
              size={17.4}
              color="rgba(0, 0, 0, 0.6)"
            />
          </div>
        ) : (
          <img
            src={upload}
            alt="upload"
            className={`w-[2rem] h-[1.4rem] ${small ? '' : 'mb-[1.3rem]'}`}
          />
        )}
        {!small ? (
          <>
            <p
              className={`font-[700] leading-[1rem] text-[0.75rem] text-center text-black ${
                error ? 'text-error' : ''
              }`}
            >
              {isDragActive ? (
                'Drop file here'
              ) : file ? (
                <>{file}</>
              ) : data ? (
                <>{data}</>
              ) : error ? (
                <>{error}</>
              ) : (
                <>
                  Drag-and-drop file, or{' '}
                  <span className={`text-${color ? color : 'purple'}`}>
                    browse
                  </span>
                </>
              )}
            </p>
            <p className="leading-[0.875rem] text-[0.625rem] text-center text-black">
              Supported file types: JPEG, PNG, PDF. Max file size: 2mb
            </p>
          </>
        ) : null}
      </div>
    </>
  )
}

export default DragAndDrop
