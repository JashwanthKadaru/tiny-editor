'use client'
import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState } from 'react'

export default function ViewPages() {
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const onFetch = async () => {
    const res = await fetch('http://localhost:3008/get/pages/1')
    const pageDataStringified = await res.json()
    console.log(pageDataStringified.message)
    const pageData = JSON.parse(pageDataStringified.message)
    console.log(pageData)
    setValue(pageData.htmlContent)
    setText(pageData.textOnlyContent)
  }

  useEffect(() => {
    onFetch()
  }, [])

  console.log('VALUE ==> ', value)
  console.log('TEXT ==> ', text)

  return (
    <div className='min-w-full min-h-full w-full container'>
      <div className='w-full p-20'></div>
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
          value={value}
          init={{
            width: '100%',
            height: '100%',
            min_height: 900,
            resize: true,
            plugins:
              'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinycomments tinydrive tinymcespellchecker typography visualblocks visualchars wordcount',
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
                  'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments',
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
