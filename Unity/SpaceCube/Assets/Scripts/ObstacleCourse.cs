using UnityEngine;
using System.Collections.Generic;

public class ObstacleCourse : MonoBehaviour {

	public GameObject checkpointPrefab;
	public int numCheckpoints = 10;
	private float minDistance = 50f;
	private float maxDistance = 100f;
	private float maxAngle = 30;
	private List<Checkpoint> checkpoints;
	public GameObject obstacleCourseStartPositionObject;
	private int activeCheckpointIndex = 0;
	public Material matCpInactive;
	public Material matCpActive;
	public Material matCpPast;

	void Start() {
		SpawnCourse();
	}

	void SpawnCourse() {
		checkpoints = new List<Checkpoint>();
		Vector3 cpPos = obstacleCourseStartPositionObject.transform.position;
		activeCheckpointIndex = 0;
		Quaternion cpRot = Quaternion.identity;
		for(int i = 0; i < numCheckpoints; i++) {
			GameObject cpGO = (GameObject)Instantiate(checkpointPrefab);
			cpGO.transform.SetParent(this.transform);
			Checkpoint cp = cpGO.GetComponent<Checkpoint>();
			cp.obstacleCourse = this;
			checkpoints.Add(cp);

			// Position the checkpoint in an interesting way
			Vector3 offset = new Vector3(0, 0, Random.Range(minDistance, maxDistance));
			cpRot *= Quaternion.Euler(
				Random.Range(-maxAngle, maxAngle), 
				Random.Range(-maxAngle, maxAngle), 
				0
			);
			cpPos += cpRot * offset;
			cpGO.transform.position = cpPos;
			cpGO.transform.rotation = cpRot;
		}
		ActivateCheckpoint(checkpoints[activeCheckpointIndex]);
	}

	void Cleanup() {
		// Delete old checkpoints
		if(checkpoints != null) {
			foreach(Checkpoint c in checkpoints) {
				Destroy(c.gameObject);
			}
			checkpoints = null;
		}
	}

	public void CheckpointWasTriggered(Checkpoint cp) {
		// Is this the active checkpoint?
		int thisIndex = checkpoints.IndexOf(cp);
		// Not the active checkpoint
		if(thisIndex != activeCheckpointIndex)
			return;
		if(activeCheckpointIndex >= numCheckpoints) {
			// We have finished
			Debug.Log("Course is done");
			return;
		}
		DeactivateCheckpoint(cp);
		activeCheckpointIndex++;
		ActivateCheckpoint(checkpoints[activeCheckpointIndex]);
	}

	void DeactivateCheckpoint(Checkpoint cp) { 
		// Change the material on the checkpoint
		MeshRenderer[] mrs = cp.transform.GetComponentsInChildren<MeshRenderer>();
		foreach(MeshRenderer mr in mrs) {
			mr.material = matCpPast;
		}
	}

	void ActivateCheckpoint(Checkpoint cp) {
		// Change the material on the checkpoint
		MeshRenderer[] mrs = cp.transform.GetComponentsInChildren<MeshRenderer>();
		foreach(MeshRenderer mr in mrs) {
			mr.material = matCpActive;
		}
	}
}
