export default {
  course_from_course_id (state) {
    return courseId => state.course.filter(item => {
      return courseId == item.course_id
    })
  },
  course_purchase_from_course_id (state) {
    return courseId => state.lesson.filter(item => {
      return courseId == item.course_id
    })
  },
  lesson_from_course_id (state) {
    return courseId => state.lesson.filter(item => {
      return courseId == item.course_id
    })
  },
  lesson_from_lesson_id (state) {
    return lessonId => state.lesson.filter(item => {
      return lessonId == item.lesson_id
    })
  },
  video_from_lesson_id (state) {
    return lessonId => state.video.filter(item => {
      return lessonId == item.lesson_id
    })
  },
  favorite_from_video_id (state) {
    return videoId => state.favorite.filter(item => {
      return videoId == item.video_id
    })
  },
  getCourseFor (state) {
    return course_id => state.courseFor.filter(item => {
      return course_id == item.course_id
    })
  },
  getCourseInclude (state) {
    return course_id => state.courseInclude.filter(item => {
      return course_id == item.course_id
    })
  },
  getCourseReceive (state) {
    return course_id => state.courseReceive.filter(item => {
      return course_id == item.course_id
    })
  }
}
