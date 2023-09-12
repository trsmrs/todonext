import Head from 'next/head'
import styles from '../styles/home.module.css'
import Image from 'next/image'

import todoImg from '../../public/assets/todo.jpg'

export default function Home() {
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
      </main>
    </div>
  )
}
