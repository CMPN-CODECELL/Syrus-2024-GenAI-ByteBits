function MyLoadingComponent() {
  return (
    <div className=" static backdrop-blur-sm min-h-screen flex items-center justify-center flex-col">
                <div className="opacity-75 h-[38h] w-[38vh] rounded-lg">
                  <Lottie
                    loop
                    animationData={loader2}
                    play
                    className="h-[40vh]"
                  />
                </div>
                <div className=" font-xl font-semibold p-2">Comicifying...</div>
                <div className=" font-xl font-semibold p-2">
                  It might take upto a minute, so please be patient
                </div>
              </div>
  )
}

export default MyLoadingComponent
