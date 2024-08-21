const Translation = (props) => {
    const { language, translation, original } = props
  return (<>
    <h4>Language {language} {original && <span className='original'>Original</span>}</h4>
    <textarea className='form-textarea' disabled value={translation}></textarea>
    </>
  )
}

export default Translation