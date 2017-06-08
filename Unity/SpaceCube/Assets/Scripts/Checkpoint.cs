using UnityEngine;

public class Checkpoint : MonoBehaviour {
	public ObstacleCourse obstacleCourse;

	void Start() {
		
	}

	void Update() {
		
	}

	void OnTriggerEnter() {
		obstacleCourse.CheckpointWasTriggered(this);
	}
}
