'use client'
import Image from 'next/image'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'

export default function Home() {
  const [text, setText] = useState('')
  const [value, setValue] = useState('<p> TinyMCE editor text </p>')

  const onSave = async (e: any) => {
    e.preventDefault()

    // const res = await fetch('http://localhost:3008/post/newpage', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     htmlContent: value,
    //     textOnlyContent: text,
    //   }),
    //
    // })
    let body = {
      data: JSON.stringify({
        htmlContent: value,
        textOnlyContent: text,
      }),
    }

    axios.post('http://localhost:3008/post/newpage', body).then((response) => {
      console.log(response.data)
    })
  }

  const uploadFile = (blobInfo: any) => {
    const formData = new FormData()
    formData.append('image', blobInfo.blob())

    let response = fetch('http://localhost:3008/upload/images', {
      method: 'POST',
      body: formData,
    })

    return response
  }
  console.log('VALUE ==> ', value)
  console.log('TEXT ==> ', text)

  return (
    <div className='min-w-full min-h-full w-full container'>
      <div className='w-full p-20'>
        <button
          onClick={(e) => onSave(e)}
          className='bg-white shadow-2xl p-2 text-base rounded-md text-black'
        >
          {' '}
          Save{' '}
        </button>
        <h1 className='text-lg text-center shadow-2xl capitalize h-6'>
          {' '}
          Test our integrated, basic tiny MCE WSYWYG-Rich-Text-Editor
        </h1>
      </div>
      <div className='min-h-screen min-h-full min-w-full flex items-stretch justify-start'>
        <Editor
          apiKey='8qaolh6gudre3h70mzloumvlk6maazqyfko3xhrgw64petzg'
          onEditorChange={(newValue, editor) => {
            setValue(newValue)
            setText(editor.getContent({ format: 'text' }))
            // console.log('VALUE ==> ', value)
            // console.log('TEXT ==> ', text)
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: 'text' }))
          }}
          initialValue='<h1>TinyMCE rich text editor</h1>'
          value={value}
          init={{
            images_upload_handler: async (blobInfo) => {
              return new Promise((resolve, reject) => {
                uploadFile(blobInfo)
                  .then(async (data) => {
                    console.log('data', data)
                    let url = ''
                    try {
                      let body = await data.json()
                      url = body.url
                    } catch (err) {
                      console.log(err)
                    }
                    resolve(url)
                  })
                  .catch((e) => {
                    reject(e)
                  })
              })
            },
            width: '100%',
            height: '100%',
            min_height: 900,
            resize: true,
            plugins:
              'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinymcespellchecker typography visualblocks visualchars wordcount',
            menu: {
              file: {
                title: 'File',
                items:
                  'newdocument restoredraft | preview | export print | deleteallconversations',
              },
              edit: {
                title: 'Edit',
                items:
                  'undo redo | cut copy paste pastetext | selectall | searchreplace',
              },
              view: {
                title: 'View',
                items:
                  'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen',
              },
              insert: {
                title: 'Insert',
                items:
                  'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
              },
              format: {
                title: 'Format',
                items:
                  'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat',
              },
              tools: {
                title: 'Tools',
                items:
                  'spellchecker spellcheckerlanguage | a11ycheck code wordcount',
              },
              table: {
                title: 'Table',
                items:
                  'inserttable | cell row column | advtablesort | tableprops deletetable',
              },
              help: { title: 'Help', items: 'help' },
            },
            toolbar:
              'aligncenter alignjustify alignleft alignnone alignright| anchor | blockquote blocks | backcolor | bold | copy | cut | fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 hr indent | italic | language | lineheight | newdocument | outdent | paste pastetext | print | redo | remove removeformat | selectall | strikethrough | styles | subscript superscript underline | undo | visualaid | a11ycheck advtablerownumbering typopgraphy anchor restoredraft casechange charmap checklist code codesample addcomment showcomments ltr rtl editimage fliph flipv imageoptions rotateleft rotateright emoticons export footnotes footnotesupdate formatpainter fullscreen help image insertdatetime link openlink unlink bullist numlist media mergetags mergetags_list nonbreaking pagebreak pageembed permanentpen preview quickimage quicklink quicktable cancel save searchreplace spellcheckdialog spellchecker | table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader | tableofcontents tableofcontentsupdate | template typography | insertfile | visualblocks visualchars | wordcount',
            skin: window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'oxide-dark'
              : 'oxide',
          }}
        />
      </div>
    </div>
  )
}
