import { supabase } from 'src/lib/database'

interface Document {
  id?: string
  title: string
  userInput: string
  grammarOutput: string
  totalWords: number
  totalMistakes: number
}

export const saveDocument = async (document: Document) => {
  const { title, userInput, grammarOutput, totalWords, totalMistakes } = document
  const { error } = await supabase.from('documents').insert({
    title: title,
    user_input: userInput,
    grammar_output: grammarOutput,
    total_words: totalWords,
    total_mistakes: totalMistakes
  })
  if (error) {
    console.log(error)
  }
  return {
    error
  }
}

export const getAllDocuments = async () => {
  const { data, error } = await supabase.from('documents').select()
  if (error) {
    console.log(error)
  }
  return {
    data,
    error
  }
}

export const getDocumentById = async (idDocument: Document['id']) => {
  const { data, error } = await supabase
    .from('documents')
    .select('id, title, user_input, grammar_output, total_words, total_mitakes')
    .eq('id', idDocument)

  if (error) {
    console.log(error)
  }

  return {
    data,
    error
  }
}

export const deleteDocument = async (idDocument: Document['id']) => {
  const { data, error } = await supabase.from('documents').delete().eq('id', idDocument)
  if (error) {
    console.log(error)
  }
  return {
    data,
    error
  }
}
