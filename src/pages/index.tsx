import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.css'
import Image from 'next/image'

import todoImg from '../../public/assets/todo.jpg'
import { db } from '../services/firebaseConnection'
import {
 collection,
 getDocs
} from 'firebase/firestore'

interface HomeProps{
  posts: number;
  comments: number;
}

export default function Home({posts, comments}: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Título do bagulho</title>
      </Head>
      <main className={styles.main}>
          <div className={styles.logoContent}>
            <Image className={styles.hero}
            alt='Logo tarefas'
            src={todoImg}
            priority
            />      
          </div>
          <h1 className={styles.title}>Minha lista de Tarefas do dia-dia</h1>

          <div className={styles.infoContent}>
            <section className={styles.box}>
              <span>+ {posts} Posts...</span>
            </section>
            <section className={styles.box}>
              <span>+ {comments} Comentários...</span>
            </section>
          </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () =>{

  const commentRef = collection(db, "comments")
  const postRef = collection(db, "tarefas")

  const commentSnapshot = await getDocs(commentRef)
  const postSnapshot = await getDocs(postRef)

  return{
    props:{
      posts: postSnapshot?.size,
      comments: commentSnapshot?.size
    },
    revalidate: 60
  }
}
