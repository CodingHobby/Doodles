using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DustField : MonoBehaviour {

	public int numDustMotes = 1000;
	public GameObject dustMotePrefab;
	public Transform theCamera;
	public float cloudRadius = 25f;

	void Start() {
		if(dustMotePrefab == null) {
			Debug.LogError("No prefab for dust mote");
			return;
		}
		if(theCamera == null && Camera.main != null)
			theCamera = Camera.main.transform;
		
		if(theCamera == null) {
			Debug.LogError("No camera");
			return;
		}

		MeshRenderer mr = dustMotePrefab.transform.GetComponentInChildren<MeshRenderer>();
		Material matSpaceDust = mr.sharedMaterial;
		matSpaceDust.SetFloat("_FalloffDistance", this.cloudRadius);
		mr.sharedMaterial = matSpaceDust;

		for(int i = 0; i < numDustMotes; i++) {
			// insideUnitSphere gets a random vector from -1 to +1
			Vector3 dustMotePos = theCamera.transform.position +
			                      (Random.insideUnitSphere * cloudRadius);
			Instantiate(dustMotePrefab, dustMotePos, Random.rotation, this.transform);
		}
	}

	void Update() {
		for(int i = 0; i < this.transform.childCount; i++) {
			// Are we too far away from the camera?
			Transform theChild = this.transform.GetChild(i);
			Vector3 diff = theChild.position - theCamera.position;
			float maxDistance = cloudRadius * cloudRadius;
			if(diff.sqrMagnitude > maxDistance) {
				// It's too far, so let's flip it to the other side of the camera
				diff = Vector3.ClampMagnitude(diff, cloudRadius);
				Vector3 newPos = theCamera.position - diff;
				theChild.position = newPos;
			}
		}
	}
}
